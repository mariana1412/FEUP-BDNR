       _____                       _____  ____ 
      |  __ \                     |  __ \|  _ \ 
      | |__) |__ ___   _____ _ __ | |  | | |_) |
      |  _  // _` \ \ / / _ \ '_ \| |  | |  _ < 
      | | \ \ (_| |\ V /  __/ | | | |__| | |_) |
      |_|  \_\__,_| \_/ \___|_| |_|_____/|____/ 



Your RavenDB cluster settings, certificate and configuration are contained in this zip file.

The new server is available at: https://a.bdnr-g04.development.run:8080
The current node ('A') has already been configured and requires no further action on your part.

An administrator client certificate has been generated and is located in the zip file.
However, the certificate was not installed on this machine (a5bd39f76706), this can be done manually.
If you are using Firefox (or Chrome under Linux), the certificate must be imported manually to the browser.
You can do that via: Tools > Options > Advanced > 'Certificates: View Certificates'.
In Linux, importing the client certificate to the browser might fail for 'Unknown Reasons'.
If you encounter this bug, use the RavenCli command 'generateClientCert' to create a new certificate with a password.
For more information on this workaround, read the security documentation in 'ravendb.net'.

It is recommended to generate additional certificates with reduced access rights for applications and users.
This can be done using the RavenDB Studio, in the 'Manage Server' > 'Certificates' page.
