<?php

namespace Lib\Installer;

use DirectoryIterator;
use SplHeap;

class VersionScaner extends SplHeap
{

    private string $directory;

    public function __construct(string $directory)
    {
        $this->directory = $directory;
    }

    protected function compare($value1, $value2): int
    {
        $v1Num = intval(str_replace(array("v", "."), "", $value1['version']));
        $v2Num = intval(str_replace(array("v", "."), "", $value2['version']));
        if ($v1Num == $v2Num)
            return 0;
        return $v1Num < $v2Num ? 1 : -1;
    }

    public function scan()
    {
        $directories = new DirectoryIterator($this->directory);
        foreach ($directories as $version) {
            if ($version->isDir() && !$version->isDot()) {
                foreach (new DirectoryIterator($version->getPathName()) as $file) {
                    if ($file->isFile() && $file->getExtension() === "sql") {
                        $this->insert(
                            array(
                                'version' => $version->getFilename(),
                                'sql' => $file->getPathName()
                            )
                        );
                    }
                }
            }
        }
    }
}