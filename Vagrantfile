Vagrant.configure("2") do |config|
  ## Choose your base box
  config.vm.box = "precise64"
  config.vm.box_url = "http://files.vagrantup.com/precise64.box"

  config.vm.synced_folder "", "/home/vagrant/minstrel"

  config.vm.network "forwarded_port", guest: 8080, host: 9090
  config.vm.network "forwarded_port", guest: 8081, host: 9091
  config.vm.network "forwarded_port", guest: 5555, host: 7070
  config.vm.network "forwarded_port", guest: 5001, host: 5050
  config.vm.network "forwarded_port", guest: 3000, host: 3030
  config.vm.network "forwarded_port", guest: 27017, host: 27017

  config.ssh.forward_agent = true

  ## For masterless, mount your file roots file root
  config.vm.host_name = 'minstrel-dev'

  config.vm.provider "virtualbox" do |v|
    v.customize ["modifyvm", :id, "--memory", "5000"]
    v.customize ["modifyvm", :id, "--cpus", "2"]
    v.customize ["modifyvm", :id, "--ioapic", "on"]
  end
end
