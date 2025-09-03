# Deployment Guide

This guide covers deploying the Notes App to Render using Docker containers.

## Prerequisites

- Docker installed locally (for testing)
- Render account
- Git repository with the code

## Local Docker Testing

### 1. Build and Run with Docker Compose

```bash
# Build and start both services
docker-compose up --build

# Or run in detached mode
docker-compose up -d --build
```

### 2. Test the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:8080/api/notes
- H2 Console: http://localhost:8080/h2-console (if enabled)

### 3. Stop the Services

```bash
docker-compose down
```

## Render Deployment

### 1. Prepare Your Repository

Make sure your code is pushed to a Git repository (GitHub, GitLab, etc.).

### 2. Deploy Backend Service

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your Git repository
4. Configure the backend service:
   - **Name**: `notes-app-backend`
   - **Environment**: `Docker`
   - **Dockerfile Path**: `./backend/Dockerfile`
   - **Docker Context**: `./backend`
   - **Plan**: Free (or choose paid plan)

5. Add Environment Variables:
   - `SPRING_PROFILES_ACTIVE`: `prod`
   - `DATABASE_PASSWORD`: Generate a secure password
   - `FRONTEND_URL`: `https://your-frontend-service.onrender.com`

6. Click "Create Web Service"

### 3. Deploy Frontend Service

1. Create another web service for the frontend
2. Configure the frontend service:
   - **Name**: `notes-app-frontend`
   - **Environment**: `Docker`
   - **Dockerfile Path**: `./frontend/Dockerfile`
   - **Docker Context**: `./frontend`
   - **Plan**: Free (or choose paid plan)

3. Add Environment Variables:
   - `REACT_APP_API_URL`: `https://your-backend-service.onrender.com`

4. Click "Create Web Service"

### 4. Update Backend CORS Configuration

After deploying the frontend, update the backend's `FRONTEND_URL` environment variable to match your frontend service URL.

## Environment Variables

### Backend Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `SPRING_PROFILES_ACTIVE` | Spring profile to use | `prod` |
| `DATABASE_PASSWORD` | Database password | `password` |
| `FRONTEND_URL` | Frontend service URL | `http://localhost:3000` |

### Frontend Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API URL | `http://localhost:8080` |

## Production Configuration

### Database

The application uses H2 database with file persistence in production:
- Database file: `/data/notesdb.mv.db`
- Data persists between container restarts
- For production, consider using PostgreSQL or MySQL

### Security

- Database password is generated automatically
- CORS is configured for the frontend domain
- H2 console is disabled in production

### Performance

- JVM memory settings: `-Xmx512m -Xms256m`
- Nginx serves static files efficiently
- Multi-stage Docker builds for smaller images

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure `FRONTEND_URL` matches your frontend service URL
2. **API Connection**: Verify `REACT_APP_API_URL` points to your backend service
3. **Database Issues**: Check if the database password is set correctly

### Logs

- Backend logs: Available in Render dashboard
- Frontend logs: Check browser console and Render logs

### Health Checks

- Backend health check: `GET /api/notes`
- Frontend health check: `GET /` (should return index.html)

## Scaling

### Free Tier Limitations

- Services may sleep after 15 minutes of inactivity
- Cold starts can take 30-60 seconds
- Limited to 750 hours per month

### Paid Plans

- Always-on services
- Faster cold starts
- More resources
- Custom domains

## Custom Domain

1. Go to your service settings
2. Add your custom domain
3. Update DNS records as instructed
4. Update environment variables with new domain

## Monitoring

- Use Render's built-in monitoring
- Check service health regularly
- Monitor resource usage
- Set up alerts for downtime

## Backup

- Database is stored in persistent volume
- Regular backups recommended for production
- Consider database migration to external service

## Security Best Practices

1. Use strong database passwords
2. Enable HTTPS (automatic on Render)
3. Keep dependencies updated
4. Monitor for security vulnerabilities
5. Use environment variables for sensitive data
