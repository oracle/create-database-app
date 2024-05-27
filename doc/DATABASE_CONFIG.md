## How to Change Database Configuration

Your database configurations are stored in the `.env` file at the root of your project.

1. **Open the `.env` file.**
2. **Modify the values** for `DB_USER`, `DB_PASSWORD`, and `CONNECT_STRING` with your new database credentials and connection string.
    ```plaintext
    DB_USER=admin
    DB_PASSWORD=new_password
    CONNECT_STRING=your_new_connection_string
    ```
3. **For Cloud Wallet users**, if you have new wallet credentials, update `WALLET_PASSWORD` and `WALLET_LOCATION` accordingly.
    ```plaintext
    WALLET_PASSWORD=new_wallet_password
    WALLET_LOCATION=./server/utils/db/new_wallet_directory
    ```
4. **Optional**: Update `HTTPS_PROXY` and `HTTPS_PROXY_PORT` if your application uses a proxy for database connections.

### Updating Wallet Database Connection

To change your wallet database connection:

1. Go to `server/utils/db`.
2. Delete the folder named `wallet`.
3. Decompress your new wallet there and rename it to `wallet`.
4. Change the password of the database user to your password.
5. In `server/utils/db/wallet/tnsnames.ora` file, the first paragraph will contain the information to create your `CONNECT_STRING`:
    ```plaintext
    tcps://<host>:<port>/<service_name>
    ```

### Apply Changes

For the changes to take effect, you need to restart your application.
```bash
npm run dev
