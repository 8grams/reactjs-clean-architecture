# ReactJS Clean Architecture

This repository is used for demonstrating how to implement Clean Architecture approach on ReactJS development.

The architecture of this application is heavily inspired by Antonio Leiva's [idea](https://antonioleiva.com/clean-architecture-android/) about pragmatic approach to the **Android Clean Architecture**, with a little *twist*, including leverage *Dependency Injection*, the implementation of *Repository Pattern*, and using *Reactive Pattern* to handle any asynchronous result. 

![image](https://i.ibb.co/kXWdz5Q/clean-architecture-own-layers.png)

It divides the application into 4 modules: `app, data, domain,` and `usecase` as described in the structure below:

```
+ src
  + app
    + di (Component and modules for Dependency Injection)
    + misc (any utils classes can be placed here)
    + repository (API or DB repositories)
    + ui
      + assets (Asset files)
      + components (View components)
      + pages (Screen files)
      + controller (Logic for views)
    + main.dart

  + data
    + contracts (Interfaces for repositories, services, etc)
    + mappers (Domain mapper)
    + presenters

 + entities
```

## Usage

	~$ yarn
    ~$ yarn start

