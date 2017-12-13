#!/bin/bash

file=".gitignore"

if [ -f $file ] ; then
    rm $file
fi
