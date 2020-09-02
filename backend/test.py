import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

def create_objects(header, line):
    split_line = line.replace("\n","").split(",") 


    id_num = int(split_line[0])
    name = split_line[1]
    parents = [int(i) for i in split_line[2].split(";")] if len(split_line[2]) > 0 else []

    spouse = None
    try:
        spouse = int(split_line[3])
    except:
        pass

    ret = {
        u"PersonID" : id_num,
        u"Name" : unicode(name),
        u"ParentIDs" : parents,
        u"ChildrenIDs" : [],
        u"SpouseID" : spouse
    }
    return ret

def add_children(people_objects):
    people_dictionary = {x["PersonID"] : x for x in people_objects}

    for key, value in people_dictionary.items():
        for parent_id in value["ParentIDs"]:
            people_dictionary[parent_id]["ChildrenIDs"].append(key)

    return people_dictionary

if __name__ == "__main__":
    lines = []
    with open("royalFamily.csv") as f:
        lines = f.readlines()

    header = lines[0]

    people_objects = [create_objects(lines[0], line) for line in lines[1:]]

    objects = add_children(people_objects)

    # Use the application default credentials
    # Use a service account
    cred = credentials.Certificate('./key.json')
    firebase_admin.initialize_app(cred)

    db = firestore.client()
    
    for doc in objects.values():
        print(doc)
        db.collection("royalFamily").add(doc)
