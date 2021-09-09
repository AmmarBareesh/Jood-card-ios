import React from "react";
import { StyleSheet, FlatList } from "react-native";

import ProductItem from "./ProductItem";

const ProductList = props => {
    return (
        <FlatList
            style={styles.listContainer}
            data={props.cards}
            renderItem={(info) => (
                <ProductItem
                    image={info.item.image}
                    price ={info.item.price}
                    name={info.item.name}
                    id={info.item.id}
                    choose={props.chooseItem}
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
