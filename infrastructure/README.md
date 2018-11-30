# RUN

## From scratch
```bash
ansible-playbook site.yml --vault-password-file $FILE
```

## Only parkingapp instance
```bash
ansible-playbook playbooks/parkingapp.yml --vault-password-file $FILE
```

## Destroy
```bash
ansible-playbook destroy_all.yml
```

## Destroy instances only
```bash
ansible-playbook playbooks/destroy_instances.yml
```

# SETUP

- Download openrc, source it
- Keys in ~/.ssh/ by default
  - ssh-add key from openstack (change permissions as well)
  - get deploy key from GH