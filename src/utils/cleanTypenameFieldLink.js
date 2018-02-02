import { ApolloLink } from 'apollo-client-preset';
//This is a custom ApolloLink which we use to clean the "__typename" field to prevent sending it to the GraphQL server. 
//Uses omitDeep based on this gist: https://gist.github.com/Billy-/d94b65998501736bfe6521eadc1ab538

const omitDeepArrayWalk = (arr, key) => {
    return arr.map((val) => {
        if (Array.isArray(val)) return omitDeepArrayWalk(val, key);
        else if (typeof val === 'object') return omitDeep(val, key);
        return val;
    });
}

const omitDeep = (obj, key) => {
    const keys = Object.keys(obj);
    const newObj = {};

    if (key === 'upload') return obj;

    keys.forEach((i) => {
        if (i !== key) {
            const val = obj[i];

            //Date and File are edge cases, 
            //reconstructing them ends up changing them to something we don't want
            if (val instanceof Date || val instanceof File) newObj[i] = val;
            else if (Array.isArray(val)) newObj[i] = omitDeepArrayWalk(val, key);
            else if (typeof val === 'object' && val !== null) newObj[i] = omitDeep(val, key);
            else newObj[i] = val;
        }
    });

    return newObj;
}

export default new ApolloLink(function (operation, forward) {
    //This will recursively traverse variables object
    //It creates an entirely new object that has __typename omitted in every object
    if (operation.variables) operation.variables = omitDeep(operation.variables, "__typename");

    return forward(operation).map((data) => data);
});

