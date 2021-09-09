import React from "react";
import { StyleSheet, FlatList } from "react-native";

import ProductItem from "./ProductItem";

const ProductList = props => {
    return (
        <FlatList
            style={styles.listContainer}
            data={props.data}
            renderItem={(info) => (
                <ProductItem
                    image={info.item.image}
                    price={info.item.price}
                    note={info.item.note}
                    link={info.item.link}
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

export default ProductList;
