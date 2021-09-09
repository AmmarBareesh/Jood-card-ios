import React from "react";
import { StyleSheet, FlatList } from "react-native";

import ProductOrderItem from "./ProductOrderItem";

const ProducOrdertList = props => {
    return (
        <FlatList
            style={styles.listContainer}
            data={props.value}
            renderItem={(info) => (
                <ProductOrderItem
                    price ={info.item.price}
                    link={info.item.link}
                    note={info.item.note}
                    id={info.item.id}
                    deleteOne={props.deleteOne}
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

export default ProducOrdertList;
