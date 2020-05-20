import gql from 'graphql-tag';

// We disable linting for local fields because there is no way to add them to
// the fetched schema.
// https://github.com/apollographql/eslint-plugin-graphql/issues/99
/* eslint-disable graphql/template-strings */
export const GET_PAYMENT_INFORMATION = gql`
    query getPaymentInformation($cartId: String!) {
        cart(cart_id: $cartId) @connection(key: "Cart") {
            id
            paymentNonce @client
            prices {
                grand_total {
                    value
                }
            }
            available_payment_methods {
                code
                title
            }
            selected_payment_method {
                code
            }
        }
    }
`;
/* eslint-enable graphql/template-strings */

// Sets the provided payment method object on the cart.
export const SET_PAYMENT_METHOD = gql`
    mutation setPaymentMethodOnCart(
        $cartId: String!
        $method: PaymentMethodInput!
    ) {
        setPaymentMethodOnCart(
            input: { cart_id: $cartId, payment_method: { code: "free " } }
        ) @connection(key: "setPaymentMethodOnCart") {
            cart {
                id
                selected_payment_method {
                    code
                }
            }
        }
    }
`;

export default {
    queries: {
        getPaymentInformationQuery: GET_PAYMENT_INFORMATION
    },
    mutations: {
        setFreePaymentMethodMutation: SET_PAYMENT_METHOD
    }
};