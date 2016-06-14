# chronos-backup
Script to backup the Chronos jobs

## Usage
### Backup
```bash
  node backup.js backup.json 172.31.200.174 8080 'Basic aW50ZWdyYXRvcjozbmlZQWNmWUZ1eGwydQ=='
  node backup.js 'file to be saved' hostname port Authorization_Token
```

### Restore
```bash
  node restore.js backup.json 172.31.200.174 8080 'Basic aW50ZWdyYXRvcjozbmlZQWNmWUZ1eGwydQ=='
  node restore.js 'json from the backup' hostname port Authorization_Token
```
