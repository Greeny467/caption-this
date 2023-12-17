

const sortCaptionsDescending = (captions) => {
    if (captions.length <= 1) {
        return captions;
    }

    const middle = Math.floor(captions.length / 2);
    const leftHalf = captions.slice(0, middle);
    const rightHalf = captions.slice(middle);

    return mergeDescending(sortCaptionsDescending(leftHalf), sortCaptionsDescending(rightHalf));
};

function mergeDescending(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex].votes > right[rightIndex].votes) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

const sortCaptionsCommentSection = (captions, userId) => {
    let userCaption = [];
    const notUserCaption = [];

    captions.forEach(caption => {
        if (caption.user._id === userId) {
            userCaption.push(caption);
        } else {
            notUserCaption.push(caption);
        }
    });

    if (userCaption.length !== 0) {
        const returnArray = [];
        const sortedCaptions = sortCaptionsDescending(notUserCaption);

        userCaption.forEach((caption) => {
            returnArray.push(caption);
        });
        sortedCaptions.forEach((caption) => {
            returnArray.push(caption);
        });
        
        return returnArray;
    }


    return sortCaptionsDescending(captions);
};


export {sortCaptionsCommentSection, sortCaptionsDescending};