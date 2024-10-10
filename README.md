# Social Media Platform

#### [Live Demo](https://pejoal.live/)

---

## Authors

- [@Pejoal](https://www.github.com/Pejoal)

---

## Installation

```shell
git clone git@github.com:Pejoal/Social-Media-Platform.git
```

```shell
cd Social-Media-Platform
```

```shell
cp .env.example .env
```

---

### Front-End

- #### Install NVM
```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
```

```shell
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

```shell
nvm install 19.1.0
```


```shell
npm install
```

---

### Back-End

- #### Install Composer V2 at Least, Then


```shell
composer require laravel/sail --dev --ignore-platform-reqs
```

```shell
alias sail="./vendor/bin/sail"
```

```shell
sail up -d
```

```shell
sail composer install --ignore-platform-reqs
```


```shell
sail artisan storage:link
```

```shell
sail artisan key:generate
```

```shell
sail artisan migrate:fresh --seed
```

```shell
npm run dev
```

#### Don't Forget to Add .env Secrets

### Database

- Username: pejoal
- Password: pejoal

---

#### No Need for This When Working Locally
##### Sends The Queued Emails ( Need To Configure Email Variables In .env File)

```shell
sail artisan schedule:work
```


---

### This is Optional
#### To Fill Database With More Dummy Data
```shell
sail artisan db:seed --class=DataSeeder
```

---

### Features

1. Register System Included ( Email / Username )
> - Email Must Be Verified
> - Forget Password ( Sending Reset Password Email Functionality )
2. The Ability to Create, Edit, Delete & Like ( Posts, Comments & Replies )
3. The Ability to See Post, Comment & Reply Likers
4. Automatic Sending Notification Email To User With Appropriate Details When...
> - Post, Coment & Reply Got Liked
> - Someone Comment on a Post
> -	Someone Reply on a Comment
> -	Someone Send a Friendship Request
5. User-Friendly & Responsive Web Design
6. Can View Other Users Profile ( See All Their Posts & Number Of Likes They Got )
7. Send, Cancel, Accept and Reject Friendship Requests
8. Public Chat (Real-Time)
9. Chat Rooms ( Real-Time )
10. Private Chats ( Real-Time ) { Users Must Be Friends }
11. The Ability to Create Groups and ..
> - Add Friends to The Group
> - Remove Friend From the Group
> - Real-Time Chat
12. Translations for Most Used 10 Languages
13. Clean Code & Using OOP
14. Dashboard For Super Admins
> -	Control Users
> -	Control Posts
> -	Control Comments
> -	Control Replies
> -	Control Public Messages
15. Much More...

---

### Prerequisites

- Composer ( V 2 )
- Node js ( V 19.1.0 )
- Docker ( Compose )

---

### Stack

- PHP ( 8.2 )
- Laravel 10 ( Sail )
- MySQL ( MariaDB )
- Inertia js
- Vue 3 ( Composition API )
- Tailwind CSS

---

## For Support.. 

- [My Email](pejoal.official@gmail.com)
