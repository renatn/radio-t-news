# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|

    config.vm.box = "ubuntu/trusty64"
    # config.vm.synced_folder ".", "/vagrant"
    config.vm.synced_folder ".", "/vagrant", mount_options: ["dmode=700,fmode=600"]
    config.vm.box_check_update = false

    config.vm.provider "virtualbox" do |vb|
        vb.memory = "521"
        vb.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/v-root", "1"]
    end

    config.vm.define :dev do |dev|
        dev.vm.network :forwarded_port, host: 8080, guest: 8080
        dev.vm.provision "shell", path: "bootstrap.sh"
        dev.vm.provision :shell, inline: 'ansible-playbook -i "localhost," /vagrant/ansible/dev.yml -c local -v'
        dev.vm.hostname = "web"
    end

end
