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

## Destroy only instances
```bash
ansible-playbook playbooks/destroy_instances.yml
```