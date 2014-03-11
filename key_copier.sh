#!/usr/bin/expect -f
spawn ssh-copy-id -i andreyfilin@UbuntuAndreyF
expect "password:"
send "eltech2014\r"
expect "added."
exit 0
