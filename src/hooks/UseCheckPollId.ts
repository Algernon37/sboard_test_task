 const checkPollId = (pollId: string | undefined): string => {
    if (!pollId) {
        console.error("pollId is undefined");
        throw new Error("Poll ID is required"); 
    }
    return pollId;
};

export default checkPollId