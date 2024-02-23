// import { useState } from 'react';
// import { QuickFormProvider } from "../../core/src/state/QuickformProvider";
// import testDataWithColumnsAndRows from "./data/testDataWithColumnsAndrows.json";
// import { TemplateOne } from "./templates/TemplateOne";
// import { TemplateTwo, testDataTwo } from "./templates/TemplateTwo";
// import { TemplateThree, testDataThree } from './templates/TemplateThree';

// export const App = () => {
//     const [selectedTemplate, setSelectedTemplate] = useState('templateThree');

//     const temp1 = <QuickFormProvider key="templateOne" definition={testDataWithColumnsAndRows}>
//         <TemplateOne />
//     </QuickFormProvider>;
//     const temp2 = <QuickFormProvider key="templateTwo" definition={testDataTwo}>
//         <TemplateTwo />
//     </QuickFormProvider>;
//     const temp3 = <QuickFormProvider key="templateThree" definition={testDataThree} >
//         <TemplateThree />
//     </QuickFormProvider>;


//     const renderTemplate = () => {
//         switch (selectedTemplate) {
//             case 'templateOne': return temp1;
//             case 'templateTwo': return temp2;
//             case "templateThree": return temp3;
//             default:
//                 return temp1;
//         }
//     };

//     return (
//         <div style={containerStyling}>
//             <div style={selectSwitchStyling}>
//                 <select
//                     style={{ width: '200px', height: '50px' }}
//                     value={selectedTemplate}
//                     onChange={(e) => setSelectedTemplate(e.target.value)}
//                 >
//                     <option value="templateOne">Template One</option>
//                     <option value="templateTwo">Template Two</option>
//                     <option value="templateThree">Template Three</option>
//                 </select>
//             </div>
//             <div style={quickformStyling}>
//                 {renderTemplate()}
//             </div>
//         </div>
//     );
// };

// const containerStyling: React.CSSProperties = {
//     width: '100%',
//     height: '800px',
//     padding: '10px'
// }

// const selectSwitchStyling: React.CSSProperties = {
//     margin: 'auto',
//     width: '100%'
// }

// const quickformStyling: React.CSSProperties = {
//     display: 'flex',
//     marginTop: '20px',
//     justifyContent: 'center',
//     width: '100%'
// }
