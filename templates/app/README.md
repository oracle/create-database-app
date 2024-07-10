
# Command Line Instructions

You can also upload existing files from your computer using the instructions below.

## Git global setup
```sh
git  config  --global  user.name <your_name>
git  config  --global  user.email <your_email>
```

## Create a new repository
```sh
git clone <repo_url> 
cd  test
git switch -c main 
touch README.md 
git add README.md 
git commit -m "add README" 
git push -u origin main
```

## Push an existing folder
```sh
cd existing_folder
git init --initial-branch=main
git remote add origin <repo_url>
git add .
git commit -m "Initial commit"
git push -u origin main
```
## Push an existing Git repository

```sh
cd existing_repo
git remote rename origin old-origin
git remote add origin <repo_url>
git push -u origin --all
git push -u origin --tags
