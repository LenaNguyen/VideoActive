//import _ from './lodash';

export function paginate(items, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize;
    console.log(items, startIndex);
    return items.slice(startIndex, startIndex + pageSize);

    //how to paginate using lodash:
    //_(items).slice(startIndex).take(pageSize).value();
}