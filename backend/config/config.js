let env = process.env.NODE_ENV || 'development';
console.log('Environment: ', env);

if (env === 'development') {
    process.env.HOST="http://localhost:8888";
    process.env.HOST_CLIENT="http://localhost:3000";
    // TO DO: We need to have a seperate Dev DB
} else if (env === 'production') {
    process.env.HOST= "http://www.musicrowd.ca";
}