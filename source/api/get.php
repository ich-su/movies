<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Expires: " . date("r"));


require_once 'config.php';
require_once 'unit.php';


class Record implements JsonSerializable
{
    protected $indexPath = [];
    protected $index;
    protected $isDir;
    protected $russianName = '';
    // protected $russianNameReal = '';
    protected $russianNameAdd = '';
    protected $originalName = '';
    protected $year = false;
    protected $filter = [];
    protected $quality = false;
    protected $firstChild = false;
    protected $lastChild = false;
    protected $lastGrandchild = false;

    protected $path;
    protected $fileName;

    protected function oneSpaces($s)
    {
        return preg_replace('/\s+/u', ' ', $s);
    }

    protected function parseName($name)
    {
        $open = mb_strpos($name, '(');
        $close = mb_strpos($name, ')');
        $tire = mb_strpos($name, '--');

        if (($open > 0) && ($close > $open)) {
            $this->russianName = trim(mb_substr($name, 0, $open - 1));
            $this->originalName = trim(mb_substr($name, $open + 1, $close - $open - 1));

            if ($tire > $close) {
                $this->quality = trim(mb_substr($name, $tire + 2));
            } else {
                $tire = mb_strlen($name);
            }

            $this->filter = explode(',', mb_substr($name, $close + 1, $tire - $close - 1));
            foreach($this->filter as &$item) {
                $item = trim($item);
            }
            sort($this->filter);
        } else {
            $this->russianName = trim($name);
        }

        $name = $this->russianName;

        $dot = -1;
        $docChar = false;
        for ($i = mb_strlen($name) - 1; ($dot == -1) && ($i > 0); $i--) {
            $docChar = mb_substr($name, $i, 1);
            if (in_array($docChar, ['.', '…', '!'])) {
                $dot = $i;
            }
        }

        if ($dot > 0) {
            $year = trim(mb_substr($name, $dot + 1));
            if (is_numeric($year)) {
                $this->year = (int)$year;
                if (($docChar != '.') || (mb_substr($name, $dot - 1, 1) == '.')) {
                    $dot++;
                }
                $this->russianName = trim(mb_substr($name, 0, $dot));
            }
        }

        // 2026
        // $this->russianNameReal = $this->russianName;
        $this->russianNameAdd = '';

        if (in_array('сериал', $this->filter)) {
            $this->russianNameAdd .= '. Сериал';
            // $this->russianName .= $this->russianNameAdd;
        }
    }

    public function setChilderen($first, $last, $lastGrand)
    {
        $this->firstChild = $first;
        $this->lastChild = $last;
        $this->lastGrandchild = $lastGrand;
    }

    public function jsonSerialize()
    {
        return get_object_vars($this);
    }

    function __construct($indexPath, $index, $isDir, $path, $fileName)
    {
        $this->indexPath = $indexPath;
        $this->index = $index;
        $this->isDir = $isDir;
        $this->path = $path;

        $this->fileName = $fileName;
        if ($isDir) {
            $this->parseName($fileName);
        } else {
            $path_info = pathinfo($fileName);
            $this->parseName($path_info['filename']);
        }
    }
}

class Movies
{
    protected $records = [];
    protected $index = -1;
    protected $errors = [];

    protected function error($err)
    {
        $this->errors[] = $err;
    }

    function cmpName($e1, $e2) {
        return strcmp(mb_strtolower($e1['name']), mb_strtolower($e2['name']));
    }

    protected function newRecord($path, $fileName, $isDir, $indexPath)
    {
        $this->index++;
        $record = new Record($indexPath, $this->index, $isDir, $path, $fileName);
        $this->records[] = $record;

        return $this->index;
    }

    protected function scanDir($paths, $aliases, $indexParent, $indexPath)
    {
        $saveIndex = $this->index;
        $firstChild = false;
        $lastChild = false;

        $dirs = [];
        $nexts = [];
        $indexPath[] = $indexParent;

        foreach ($paths as $path) {
            try {
                $files = scandir($path);
            } catch (Exception $e) {
                $this->error("ошибка сканирования папки '$path'");
                $files = [];
            }

            foreach ($files as $file) {
                if (($file != '.') && ($file != '..')) {
                    $fullPath = $path . DIRECTORY_SEPARATOR . $file;
                    $isDir = is_dir($fullPath);
                    if ($isDir) {
                        $dirs[] = ['name' => $file, 'path' => $path, 'fullPath' => $fullPath];
                    } else {
                        $this->newRecord($path, $file, false, $indexPath);
                    }
                }
            }
        }

        if ($aliases) {
            foreach ($aliases as $alias) {
                $this->newRecord('', $alias['name'], true, $indexPath);
                $nexts[] = ['paths' => $alias['paths'], 'index' => $this->index];
            }
        }

        if ($dirs) {
            usort($dirs, array($this, "cmpName"));

            for($i = 0; $i < count($dirs); $i++) {
                if (($i === 0) || ($this->cmpName($dirs[$i - 1], $dirs[$i]) !== 0)) {
                    $recordIndex = $this->newRecord(/* $dirs[$i]['path'] */ '', $dirs[$i]['name'], true, $indexPath);
                    $nexts[] = ['paths' => [$dirs[$i]['fullPath']], 'index' => $recordIndex];
                } else {
                    $nexts[count($nexts) - 1]['paths'][] = $dirs[$i]['fullPath'];
                }
            }
        }

        if ($saveIndex < $this->index) {
            $firstChild = $saveIndex + 1;
            $lastChild = $this->index;

            foreach ($nexts as $next) {
                $this->scanDir($next['paths'], false, $next['index'], $indexPath);
            }

            $this->records[$indexParent]->setChilderen($firstChild, $lastChild, $this->index);
        }
    }

    public function echoResult()
    {
        global $config;

        $result = [
            'records' => $this->records,
            'errors' => $this->errors,
            'favorites' => $this->loadFavorites(),
            'themes' => $this->scanThemes(),
            'config' => $config
        ];
        return json_encode($result, JSON_UNESCAPED_UNICODE);
    }

    protected function initPaths()
    {
        $paths = $this->getFile('.paths', true);

        $result = [
            'paths' => [],
            'aliases' => []
        ];
        $to = &$result['paths'];
        $index = -1;

        foreach ($paths as &$path) {
            if ($path && (mb_substr($path, 0, 1) !== '>')) {
                if ((mb_strlen($path) > 1) && (mb_substr($path, 0, 1) === '[') && (mb_substr($path, -1, 1) === ']')) {
                    $aliasName = trim(mb_substr($path, 1, mb_strlen($path) - 2));
                    if ($aliasName) {
                        $index++;
                        $result['aliases'][$index] = [];
                        $result['aliases'][$index]['name'] = $aliasName;
                        $result['aliases'][$index]['paths'] = [];
                        $to = &$result['aliases'][$index]['paths'];
                    } else {
                        $to = &$result['paths'];
                    }
                } else {
                    $rpath = realpath($path);
                    if ($rpath) {
                        $to[] = $rpath; // проверку бы на повтор - array_unique, а лучше вообще по всем путям
                    } else {
                        $this->error("папка '$path' не найдена");
                    }
                }
            }
        }

        return $result;
    }

    protected function getFile($ext, $error)
    {
        global $post;

        $cfg = HERE_DIR . $post['filePaths'] . $ext;
        if (file_exists($cfg)) {
            $file = file($cfg);
        } else {
            $file = [];
            if ($error) {
                $this->error("ошибка в url: файл '$cfg' не найден");
            }
        }

        foreach ($file as &$line) {
            $line = trim($line);
        }

        return $file;
    }

    protected function loadFavorites()
    {
        $fav = $this->getFile('.favorites', false);
        sort($fav);
        return $fav;
    }

    protected function scanThemes()
    {
        $result = ['blue'];

        $css = scandir('../web/themes/');
        foreach ($css as $file) {
            if (($file != '.') && ($file != '..')) {
                $result[] = str_replace('.css', '', $file);
            }
        }

        return $result;
    }

    function __construct()
    {
        $paths = $this->initPaths();
        $index = $this->newRecord('', '', true, []);
        $this->scanDir($paths['paths'], $paths['aliases'], $index, []);
    }
}



//mb_internal_encoding("UTF-8");

$movies = new Movies();
echo($movies->echoResult());
