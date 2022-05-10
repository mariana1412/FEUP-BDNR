# Project

## Data

Data should be stored in a `data` folder in the root of the repository. Raven will access this folder for data. If starting fresh, docker will automatically create this folder.

## Running the project

### Requirements

- Docker and docker compose
- Python
- A web browser

### First setup

**If it is your first time running the script**, run the `startup.sh` script found in the `ravendb` folder and use the `-b` option, as follows:

```
./startup.sh -b
```

Then, you must create the databases through the Raven Studio interface. For this, navigate to `http://localhost:8080/studio/index.html#databases` and create three databases named:

- `products`
- `clients`
- `purchases`

After creating the databases, run the `upload.sh` script also found in the `ravendb` folder.

```
./upload.sh
```

### Normal run

If you have already done the setup before and haven't deleted the docker container or volume, data is persisted, therefore, you only need to run the `startup.sh` script with no options, from the `ravendb` folder.

```
./startup.sh
```

Open http://localhost:8080/ to access the Raven Studio.
