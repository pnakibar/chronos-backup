# chronos-backup
Script to backup the Chronos jobs

## Usage
### Backup
```bash
  node backup.js backup.json 172.31.200.174 8080 'Basic tok3n'
  node backup.js 'file to be saved' hostname port Authorization_Token
```

### Restore
```bash
  node restore.js backup.json 172.31.200.174 8080 'Basic tok3n'
  node restore.js 'json from the backup' hostname port Authorization_Token
```

## Known Issues
- Jobs with dependencies:
  - Run the restore script 2 times (or more) for them to run;
  - Yes, I'm not proud of this.
