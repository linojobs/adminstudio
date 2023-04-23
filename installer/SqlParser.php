<?php

namespace Installer;

class SqlParser
{

    private array $chars;
    private string $preChar;
    private string $state;
    private mixed $fileHandler;

    public function __construct(string $file)
    {
        $this->fileHandler = fopen($file, "r");
        $this->chars = array();
        $this->state = "";
        $this->preChar = "";
    }

    public function __destruct()
    {
        if ($this->fileHandler) {
            fclose($this->fileHandler);
        }
    }

    protected function checkChar()
    {
        if (!isset($this->chars[1]))
            return;
        $c2 = $this->chars[0];
        $c1 = $this->chars[1];
        $symbol = $c1 . $c2;

        if ($this->state == "BLOCK_COMMENT_START") {
            if ($symbol == "*/") {
                $this->state = "NEWLINE";
                $c = array_shift($this->chars);
                while ($c != "BLOCK_COMMENT_START") {
                    $c = array_shift($this->chars);
                    if (empty($this->chars))
                        break;
                }
            }
            return;
        }

        if ($this->state == "COMMENT_START") {
            if ($c2 == "\n") {
                $this->state = "NEWLINE";
                $c = array_shift($this->chars);
                while ($c != "COMMENT_START") {
                    $c = array_shift($this->chars);
                    if (empty($this->chars))
                        break;
                }
            }
            return;
        }

        if ($this->state == "STR_START") {
            if ($c2 == "\"") {
                $this->state = "STR_END";
            }
            return;
        }

        if ($symbol == "/*") {
            $this->state = "BLOCK_COMMENT_START";
            array_shift($this->chars);
            array_shift($this->chars);
            array_unshift($this->chars, "BLOCK_COMMENT_START");
        }

        if ($symbol == "--") {
            $this->state = "COMMENT_START";
            array_shift($this->chars);
            array_shift($this->chars);
            array_unshift($this->chars, "COMMENT_START");
        }
        if ($c1 == "\"") {
            $this->state = "STR_START";
        }
        if ($c2 == ";") {
            $this->state = "DELIMITER";
        }
    }

    protected function process(): void
    {
        $this->chars = [];
        while (!feof($this->fileHandler)) {
            $c = fgetc($this->fileHandler);
            array_unshift($this->chars, $c);
            $this->checkChar();
            if ($this->state == "DELIMITER") {
                $this->state = "NEWLINE";
                break;
            }
        }
    }

    public function next(): string
    {
        $this->process();
        $statment = trim(join("", array_reverse($this->chars)));
        if ($statment == ";") {
            return $this->next();
        }
        if (empty($statment) && !$this->isEnd()) {
            return $this->next();
        }
        return $statment;
    }

    public function isEnd(): bool
    {
        if (!$this->fileHandler) {
            return true;
        }
        if (feof($this->fileHandler)) {
            fclose($this->fileHandler);
            $this->fileHandler = false;
            return true;
        }
        return false;
    }
}
