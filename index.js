const contactsOperations = require("./contacts");

const fs = require("fs/promises");


const invokeAction = async ({ action, id, name, email, phone}) => {
    switch (action) {
        case "list":
            const contacts = await contactsOperations.listContacts();
            console.log(contacts);
            break;
        case "get":
            const contact = await contactsOperations.getContactById(id);
            if (!contact) {
                throw new Error(`Contact with id=${id} not found`);
            }
            console.log(contact);
            break;
        case "add":
            await contactsOperations.addContact(name, email, phone)
            break;
        case "remove":
            const removeContact = await contactsOperations.removeContact(id);
            console.log(removeContact);
            break;
        
        default:
            console.warn('\x1B[31m Unknown action type!');
    }
}

//const id = "1";
// const newData = {
//     "name": "Qqqqq Ttttt",
//     "email": "////////",
//     "phone": "(888) 888-3792"
// };
const contactId = "11";
//invokeAction({ action: "list" });
//invokeAction({ action: "get", id });
//invokeAction({ action: "add", name: "Qqqqq Ttttt", email: "////////", phone: "(888) 888-3792" });
invokeAction({action: "remove", id: contactId });

// const fileOperation = async (filePath, action = "read", data = "") => {
//     switch (action) {
//         case "read":
//             const text = await fs.readFile(filePath, "utf-8");
//             console.log(text);
//             break;
//         case "add":
//             await fs.appendFile(filePath, data)
//             break;
//         case "replace":
//             await fs.writeFile(filePath, data);
//             break;
//         default:
//             console.log("Unknown action")
//     }
// }

// fileOperation("db/tot.txt");
// //fileOperation("db/tot.txt", "add", "\nAnd you Helloooo!!!")
// fileOperation("db/tot.txt", "replace", "And you Helloooo!!!")
// fs.readFile("db/tot.txt", "utf-8")
//     .then(data => {
//         //const text = data.toString();
//         console.log(data)
//     })
//     .catch(error => console.log(error.message))