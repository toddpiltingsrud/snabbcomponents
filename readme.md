This will be a component authoring library that uses JSX and a react-like API.

It uses the web components standard.

There will be two ways of bootstrapping components:

1: Add the custom HTML element to the page.
2: Call the component's constructor function with a CSS selector and an object containing the component instance's props.
The constructor will instantiate an instance of the component inside the element targeted by the CSS selector using the configuration argument as its props. (We'll just have to figure out how to enable calling of the constructor. Since it inherits from HTMLElement, contructing a component instance manually throws an error when "super" is called.)

It's interesting to note that shadow DOM would be available with either of these methods.

The use case for a library like this is to add web components to server-rendered web applications.
I want to adopt a more structured way of introducing dynamic behavior to traditional server-rendered web applications.
Server-rendered web applications still tend to be the domain of jQuery.
The problem with jQuery and similar libraries is that there is no formal mechanism for creating and managing data-driven behaviors. So we typically see Javascript that binds event handlers directly to HTML elements which then make changes directly to the DOM when those handlers are triggered. This tightly couples behaviors to specific DOM elements, making the page hard to change and easy to break.

I could use Vue to do this, but I don't like its templating strategy.
Vue extends HTML with custom attributes to create branching and looping constructs.
Problems with this approach:

-   It's proprietary. I have to relearn it every time I revisit a project with Vue components in it.
-   It's limited. It's hard to create a full-fledged programming language with this approach without ending up with something really arcane and messy. Declarative languages are not a good fit for complex operations involving a lot of data. It reminds me of XSL, a language that devs love to hate for exactly this reason.
