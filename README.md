# CookbookNook

![cbnook](https://github.com/ddobson/cookbook-nook/blob/master/cbnook.png)

[Deployed App](http://cookbook-nook.surge.sh/)
[API Repo](https://github.com/ddobson/cookbook-nook-api)

## Technolgy
- [ReactJS](https://github.com/facebook/react)
- [React Router v4](https://reacttraining.com/react-router/web/guides/quick-start)
- [Create React App](https://github.com/facebookincubator/create-react-app)
- [Material UI](http://www.material-ui.com/#/)
- [Surge Sh](http://surge.sh/)
- Git

## Installation
After cloning all dependencies can be installed using NPM.

```
$ npm install
```

For production you can build static files with NPM.

```
$ npm run build
```

## Pitch

CookbookNook is an app that allows users get random recipe suggestions from their real-world cookbook collection. Users enter their cookbooks and the pages that recipes appear in the book. They can then get random suggestions from that book. If they like the recipe they find on the suggested page, they can save it along with it's page numbers or roll for another random page. Once a recipe is saved the user can go back and leave comments on it after they have tried cooking it. If the user saves the recipe, it won't be shown to them again.

The target audience for this app is people who like to cook and have a large cookbook collection. The app is meant to be a fun way to push you out of your comfort zone and try new things.

The app's foundation is built on React. Many stylized components come from the Material UI component library. Routing is handled by the latest version of React Router (4.0.0 at the time of writing). The app utilizes a Rails API for data persistance and calculating the available pages left for a given book.

[Wireframes](https://github.com/ddobson/cookbook-nook/blob/master/cookbook_nook.pdf)

User Stories are filed here under [Issues](https://github.com/ddobson/cookbook-nook/issues?utf8=%E2%9C%93&q=is%3Aissue%20is%3Aclosed%20) and prefixed by 'User Story.'

## Hurdles

This biggest hurdle with this app was learning the React framework. I began learning React only a couple days prior to begining the project. React made many parts of the project easy and fast but when I ran into certain issues, especially more diffifult issues regarding component lifecycle, it took longer to debug than other apps I have worked on in the past. Also, while I like some of the styling provided by Material UI, at times I found it obtuse and limiting. In future projects I would investigate another component library.
