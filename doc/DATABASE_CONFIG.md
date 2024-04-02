## How to Change Database Configuration

Your database configurations are stored in the `.env` file at the root of your project.

1. **Open the `.env` file.**
2. **Modify the values** for `DB_USER`, `DB_PASSWORD`, and `CONNECT_STRING` with your new database credentials and connection string.
    ```plaintext
    DB_USER=new_user
    DB_PASSWORD=new_password
    CONNECT_STRING=your_new_connection_string
    ```
3. **For Cloud Wallet users**, if you have new wallet credentials, update `WALLET_PASSWORD` and `WALLET_LOCATION` accordingly.
    ```plaintext
    WALLET_PASSWORD=new_wallet_password
    WALLET_LOCATION=./server/utils/db/new_wallet_directory
    ```
4. **Optional**: Update `HTTPS_PROXY` and `HTTPS_PROXY_PORT` if your application uses a proxy for database connections.

### Apply Changes

For the changes to take effect, you need to restart your application.
```bash
    npm run dev
```


### Troubleshooting

If you encounter issues after changing your database configuration:

- **Review the `.env` file**: Ensure there are no typos in the variable names or values.
- **Check database credentials**: Verify that the user, password, and connection string are correct and that the database user has the necessary permissions.
- **Inspect logs**: Look for any error messages in your application logs that might indicate what went wrong.

### Notes

- Keep your `.env` file secure, especially when it contains sensitive information like database passwords.

By following these steps, you can successfully update your application's database configurations to reflect new credentials, connection strings, or other related changes.