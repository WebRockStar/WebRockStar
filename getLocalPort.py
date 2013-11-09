#!/usr/bin/python
import socket
import sys
import subprocess
import os
###This will give you the servername viz 127.0.0.1
def get_server():
    server = socket.gethostbyname(socket.gethostname())
    return server

###set your server port to 0 and system will throw an usable port no.
def get_port():
    port = 0
    return port

def listen(server_param,port_param):
    s=socket.socket(socket.AF_INET,socket.SOCK_STREAM)
    s.bind((server_param,port_param))
    s.listen(1)
    ipaddr,port = s.getsockname()
    print ipaddr,port
    return port
    
##Save unused port no.
portNo = listen(get_server(),get_port())
projLocation = "/tmp/" + sys.argv[1]

# subprocess.check_call(["cd",projLocation]);
os.chdir(projLocation);
subprocess.check_call(["npm","install"]);
##have towrite to check if there is some problem in the code
# subprocess.call("cd "+projLocation+" && export PORT="+ str(portNo) +" && npm start");
## read the tmpId and run npm install 
