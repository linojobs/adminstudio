<?php
namespace Lib\Installer;

use Iterator;

class SqlFile implements Iterator
{
    private int $currentKey;
    private string $sql;
    private SqlParser $sqlparser;

    public function __construct(string $file)
    {
        $this->sql = "";
        $this->currentKey = 0;
        $this->sqlparser = new SqlParser($file);
    }

    public function __destruct()
    {

    }

    public function rewind(): void
    {
        $this->currentKey = 0;
    }

    public function current(): mixed
    {
        return $this->sql;
    }

    public function key(): mixed
    {
        return $this->currentKey;
    }

    public function next(): void
    {
        $this->currentKey++;
    }

    public function valid(): bool
    {
        if ($this->sqlparser->isEnd())
            return false;
        $this->sql = $this->sqlparser->next();
        if (empty($this->sql))
            return false;
        return true;
    }

}