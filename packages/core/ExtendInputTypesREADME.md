# Extending QuickForm with Additional Input Types
To enhance QuickForm with new input types, follow these concise steps.   
The guide includes TypeScript code snippets for clarity.

## Step 1: Create New Input Components
Develop custom input components in React. These should accept `InputProps` to properly integrate with QuickForm's dynamic form system.

Example for a custom input component:

```typescript
import React, { FC, ChangeEvent, useState } from "react";
import { InputProps } from "@eavfw/quickform-core";

const CustomInput: FC<InputProps> = ({ questionModel, onOutputChange }) => {
    // Custom input logic here
    return <div>Your Custom Input Markup</div>;
};
```

## Step 2: TODO - How do we Implement Input Properties Parsing?
Extend the parseInputProperties function to handle your custom input types. This function converts QuestionJsonModel to specific properties for your input type.

Example extension for parseInputProperties:

```typescript
import { QuestionJsonModel, YourCustomProperties } from "@eavfw/quickform-core/src/model";

function parseInputProperties(questionJsonModel: QuestionJsonModel): YourCustomProperties | undefined {
    // Add your custom case(s) here
    switch (questionJsonModel.inputType) {
        case "yourCustomType":
            return {
                // Your custom properties mapping
            };
        default:
            return undefined;
    }
}
```

## Step 3: Register Input Components
Use `registerInputComponent` to add your custom input components to the QuickForm system. This makes your component available for rendering in forms.

Example registration:

```typescript
import { registerInputComponent } from "@eavfw/quickform-core";
import { CustomInput } from "./path/to/your/CustomInput";

registerInputComponent("yourCustomType", CustomInput);
```

## Step 4: Import New Input Components in App.tsx
Ensure new input components are imported in your application's entry point to make them available for use.

Example import in App.tsx:
```typescript
import "./path/to/your/CustomInput";
```

## Step 5: Update QuickForm Definitions
Modify your QuickForm JSON definitions to use your new input types. Ensure the `inputType` in your definitions matches the key used in registerInputComponent.

Example JSON definition snippet:

```typescript
{
  "inputType": "yourCustomType",
  "question": "Your Custom Question?",
  "properties": {
    // Custom properties for your input type
  }
}
```
## Step 6: Test Your Forms
After integrating new input types, thoroughly test your forms to ensure that custom inputs render correctly and function as intended.

By following these steps, you can seamlessly integrate custom input types into QuickForm, broadening its capabilities and customizability.

```typescript
Ensure to replace placeholders like `YourCustomProperties`, `yourCustomType`, and file paths with actual values relevant to your implementation.
```