# Logging in Deployment

## How Logging Works

The application's logging system is designed to work seamlessly in both development and deployment environments.

### Development Environment
- Logs are written to `data/scene_logs.jsonl` as JSON Lines format
- File persists locally between application restarts
- Easy to inspect and analyze locally

### Deployment Environment (Render)
- Due to ephemeral filesystem limitations, file-based logging is not persistent
- Application automatically falls back to stdout logging with `SCENE_LOG:` prefix
- Render captures all stdout logs which can be viewed in the Render dashboard
- Logs are searchable and can be streamed in real-time

## Log Format

All logs follow the same JSON structure:
```json
{
  "timestamp": "2025-12-22T14:30:45.123456",
  "scene_text": "The image contains 2 persons and 1 car.",
  "labels": {
    "environment": "urban",
    "human_presence": "high",
    "activity_context": "street"
  }
}
```

## Accessing Logs in Render

1. Go to your Render dashboard
2. Navigate to your web service
3. Click on the "Logs" tab
4. Filter logs by searching for `SCENE_LOG:` to see only scene analysis logs
5. Or view all application logs including health checks and errors

## Alternative Persistent Logging Solutions

If you need persistent log storage, consider these options:

### 1. External Log Storage Services
- **Papertrail** - Cloud-hosted log management
- **Loggly** - Enterprise log analysis
- **Datadog** - Infrastructure and application monitoring

### 2. Database Storage
Modify the logger to store logs in a database instead of files:
```python
# Example with MongoDB
from pymongo import MongoClient

client = MongoClient(os.environ.get('MONGODB_URI'))
db = client['scene_analysis']
collection = db['logs']

def log_scene(scene_text: str, labels: dict):
    record = {
        "timestamp": datetime.utcnow(),
        "scene_text": scene_text,
        "labels": labels
    }
    collection.insert_one(record)
```

### 3. Cloud Storage
Store logs in AWS S3, Google Cloud Storage, or similar services:
```python
# Example with AWS S3
import boto3

s3 = boto3.client('s3')

def log_scene(scene_text: str, labels: dict):
    # Implementation to append to S3 object
    pass
```

## Environment Variables

To customize logging behavior in deployment:

- `LOG_DIR` - Directory for log files (defaults to 'data')
- In Render, you can set this in the environment variables section

## Best Practices

1. **Monitor logs regularly** - Set up alerts for error patterns
2. **Use structured logging** - All logs are JSON formatted for easy parsing
3. **Filter appropriately** - Use `SCENE_LOG:` prefix to isolate scene analysis data
4. **Consider log volume** - High-frequency logging can impact performance and costs

The current implementation provides a robust foundation for both development and production logging needs.