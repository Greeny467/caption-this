

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
    let userCaption = undefined;
    const notUserCaption = [];

    captions.forEach(caption => {
        if (caption.user._id === userId) {
            userCaption = caption;
        } else {
            notUserCaption.push(caption);
        }
    });

    if (userCaption !== undefined) {
        return [userCaption, sortCaptionsDescending(notUserCaption)];
    }


    return sortCaptionsDescending(captions);
};


export {sortCaptionsCommentSection, sortCaptionsDescending};