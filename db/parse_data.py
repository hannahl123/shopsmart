import os
import csv

directory = "./data"

for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith(".csv"):
            path = os.path.join(root, file)
            # print(os.path.basename(root) + ":")
            store_name = os.path.basename(root)
            with open(path, "r") as f:
                reader = csv.reader(f, delimiter=";")
                next(reader, None)
                for row in reader:
                    print(
                        f"((SELECT id FROM companies WHERE name = '{store_name}'),"
                        "(SELECT id FROM products WHERE name = '{row[1]}'),"
                        "'{row[0]}', {row[2]}),"
                    )
