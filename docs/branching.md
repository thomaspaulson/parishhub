# Code Branching

### Develop and master branches
Instead of a single `master` branch, this workflow uses two branches to record the history of the project. The `master` branch stores the official release history, and the `develop` branch serves as an integration branch for features.

### Feature branches
Each new feature should reside in its own branch, which can be pushed to the central repository for backup/collaboration. But, instead of branching off of `master`, `feature` branches use `develop` as their parent branch. When a feature is complete, it gets merged back into `develop`. Features should never interact directly with main.

Feature branches are generally created off to the latest develop branch. When you are done with the development work on the feature, the next step is to merge the feature_branch into `develop`.

### Hotfix branches
`hotfix` branches are used to quickly patch production releases. Hotfix branches are a lot like `feature` branches except they're based on `master` instead of `develop`. This is the only branch that should fork directly off of `master`. As soon as the fix is complete, it should be merged into both `master` and `develop`.


**Some usefull gist**

git push -d <remote_name> <branch--name>        # Delete remote

eg `git push -d orgin feature/frontend`

git branch -d <branch--name>                    # Delete local

eg `git push -d feature/frontend`

git switch <branch--name>                       # switch branch

git switch develop
get merge feature/<branch-name>                 # merge brach also
git push

eg
get switch develop
get merge feature/<branch-name>
git push

git add .
git commit -m "message"
git push


git switch -c <branch-name>                     # switch & create branch
git add .
git commit -m "message"
git push -u origin refactor                     # to publish (push) the branch to remote



