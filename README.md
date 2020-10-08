# FamilyTreeViz

I come from a really large family and for years my relatives and I have been trying to record our lineage. One of the things we struggled with was amassing and presenting this information in a way that was easy to update and share. I couldn't find any free or cheap services to do this on the web, so that's when I decide to do it myself.

## GOALS
- Individuals withing a family, regardless of technical ability, should be able to view their family tree in a simple way.
- A family should be able to host their app using free tier services
- A family should be able to field modifications to the family tree

## High Level Design
### Frontend (VueJS)
The UI displays you and your nuclear family (*a node and it's neighbors in the graph*). You navigate between family members by clicking on their names.
```
+--------------+
|    Parent    |
+-----+--------+
| You | Spouse |
+-----+--------+
|   Children   |
+--------------+
```
### Backend (Firebase)
The family structure is stored as a bidirected graph of nodes in Google Firestore
```
Node {
    Name,
    ID,
    ChildrenIDs,
    ParentIDs
}
```

## Future Work


| Goal | Description |
| ----------- | ----------- |
| Deployment Guide | Admin should be able to follow instructions to deploy this using their own google account |
| Additional Familial Information | User should be able to view photos, bio and other relevant information about family members |
| Admin and User roles | Admin should be able to create/modify data viewed by users, so they can field issues/updates from family members |
| Search | User should be able to search for family members |
| Update for complex family structures | Users should be able to digest the complex relationships that can exist between family members. e.g. divorce, remarriage, ..etc |
| Secure data (Tentative) | Users should be able to retrieve forgotten passwords (envelope encryption?) and trust that their family data is secured from basic hacking techniques |
