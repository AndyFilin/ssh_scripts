var fs = require('fs');
var spawn = require('child_process').spawn;
var ssh_out = fs.createWriteStream('./nodescripts/task1_ready/ssh_out.log');
var ssh_err = fs.openSync('./nodescripts/task1_ready/ssh_err.log', 'a');
var key_out = fs.createWriteStream('./nodescripts/task1_ready/key_out.log');

console.log('transmitting auth key');
var key_copy = spawn('expect', ['./nodescripts/task1_ready/key_copier.sh']);	//ssh key copying
	key_copy.stdout.pipe(key_out);	
	//key_copy.stdout.on('data', function(data) {
	//	console.log('key_stdout: ' + data);
	//});
	key_copy.stderr.on('data', function (data) {
		console.log('key_stderr_ssh: ' + data);
	});
	key_copy.stdout.on('close', function () {
		console.log('keys seem to have been transmitted');

function ssh_connector() {
	var input = fs.createReadStream('./nodescripts/task1_ready/command_list.txt', {encoding: 'utf8'});
			var remaining = '';
			input.on('data', function(data) {
			remaining += data;
			var index = remaining.indexOf('\n');
			function read_next_line(remaining, index) {
				var line = remaining.substring(0,index);
				console.log('connecting and passing the command: ' + line);
				remaining = remaining.substring(index + 1);
				index = remaining.indexOf('\n');
				if (index > -1) {
				var ssh_proc = spawn('ssh', ['-tt', 'andreyfilin@UbuntuAndreyF', line], {
					detached: false,
			   		stdio: [ 'ignore', 'pipe', ssh_err ] } );
					//ssh_proc.stdout.pipe(ssh_out)	
					ssh_proc.stdout.on('data', function (data) {
				  		console.log('ssh_out: ' + data);
					});
				ssh_proc.on('close', function() {
					console.log('command passed');
					read_next_line(remaining,index);
					});
					}
				else {console.log('all commands passed')}		
				}
			//while ((index > -1)) {
				read_next_line(remaining,index)
			//	}
			});
}

ssh_connector()

});
