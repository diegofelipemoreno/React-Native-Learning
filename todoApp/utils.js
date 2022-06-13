export const replaceItemFromArrayByIndex = (array, index, elem) => {
    if (index !== -1) {
        array[index] = elem;
    }

    return array;
}