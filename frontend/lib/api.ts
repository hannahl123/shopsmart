const URI = "http://10.20.104.1:3000";

export async function getCompanies() {
    const response = await fetch(`${URI}/api/get-companies`);
    return response.json();
}

export async function getCompanyItems(companyId: number) {
    const response = await fetch(`${URI}/api/company-items/${companyId}`);
    return response.json();
}

// on the company page, we want to show the items that the user has in their
// shopping cart, that are also sold by the company
export async function getMatchingItems(userId: number, companyId: number) {
    const response = await fetch(
        `${URI}/api/matching-items/${userId}/${companyId}`
    );
    return response.json();
}

export async function addItem(userId: number, productId: number) {
    const response = await fetch(`${URI}/api/add-item/${userId}/${productId}`, {
        method: "POST",
    });
    return response.json();
}

// warning: could return "The product is not sold by any companies."
export async function addShoppingListItem(userId: number, productId: number) {
    const response = await fetch(`${URI}/api/add-item/${userId}/${productId}`, {
        method: "POST",
    });
    return response.json();
}

export async function removeItem(userId: number, productId: number) {
    const response = await fetch(
        `${URI}/api/remove-item/${userId}/${productId}`,
        {
            method: "DELETE",
        }
    );
    return response.json();
}

export async function getShoppingList(userId: number) {
    const response = await fetch(`${URI}/api/shopping-items/${userId}`);
    return response.json();
}
