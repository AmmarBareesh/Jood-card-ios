import React from "react";
import { StyleSheet, FlatList } from "react-native";

import CommentItem from "./CommentItem";

const CommentList = props => {
    return (
        <FlatList
            style={styles.listContainer}
            data={props.comments}
            renderItem={(info) => (
                <CommentItem
                    image={props.image}
                    is_admin={props.is_admin}
                    name={props.name}
                    time={info.item.date}
                    comment={info.item.comment}
                />
            )}
        />
    );
};

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        width: "100%",
        marginBottom: 8,
        marginTop: 8
    }
});

export default CommentList;
