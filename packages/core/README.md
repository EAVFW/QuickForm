
# @eavfw/quickform-core
Core components for quickform rendering.

# QuickForm
QuickForm is a dynamic form generator tool designed to simplify the creation of forms using JSON definition documents.   
This powerful tool allows you to define your questions in a JSON format and have them rendered as one or more questions per slide, with a variety of input types available for each question.   
QuickForm is built with flexibility and ease of use in mind.

## Features

- **Dynamic Form Creation**: Generate forms dynamically based on a JSON definition.
- **Multiple Question Types**: Support for various input types such as text, email, dropdown, radio buttons, sliders, and multiline text.
- **Customizable Slides**: Organize questions into slides, allowing for a segmented approach to form completion.
- **Intro and Ending Slides**: Ability to add introductory and concluding slides to provide context or instructions to the user.
- **Validation and Data Types**: Support for different data types (string, number, boolean) and validation based on input type.
- **Flexible Layouts**: Define custom layouts for questions, including rows and columns, for a tailored user experience.
- **Responsive Design**: Ensure your forms look great on any device with responsive design.

## Installation
To get started with QuickForm, head on over to the playground package where you can start up a sandbox environment and get a feel for how QuickForm works.

## Supported Input Types
- `<TextInput />`
- `<MultilineInput />`
- `<DropDownInput />`

# Extending QuickForm with Additional Input Types
See [ExtendInputTypesREADME.md](./ExtendInputTypesREADME.md)