#include <iostream>
#include <fstream>
#include <string>

#include "AddressBook.pb.h"

void PromptForAddress(tutorial::Person *person)
{
    std::cout << "Enter person ID number: ";
    int id;
    std::cin >> id;
    person->set_id(id);
    std::cin.ignore(256, '\n');

    std::cout << "Enter name: ";
    std::getline(std::cin, *person->mutable_name());

    std::cout << "Enter email address (blank for none): ";
    std::string email;
    std::getline(std::cin, email);
    if (!email.empty())
    {
        person->set_email(email);
    }

    while (true)
    {
        std::cout << "Enter a phone number (or leave blank to finish): ";
        std::string number;
        std::getline(std::cin, number);
        if (number.empty())
        {
            break;
        }

        tutorial::Person::PhoneNumber *phone_number = person->add_phone();
        phone_number->set_number(number);

        std::cout << "Is this a mobile, home, or work number?";
        std::string type;
        std::getline(std::cin, type);
        if (type == "mobile")
        {
            phone_number->set_type(tutorial::Person::MOBILE);
        }
        else if (type == "home")
        {
            phone_number->set_type(tutorial::Person::HOME);
        }
        else if (type == "work")
        {
            phone_number->set_type(tutorial::Person::WORK);
        }
    }
}

int main(int argc, char *argv[])
{
    GOOGLE_PROTOBUF_VERIFY_VERSION;

    if (argc != 2)
    {
        std::cerr << "Usage: " << argv[0] << "ADDRESS_BOOK_FILE" << std::endl;
        return -1;
    }

    tutorial::AddressBook address_book;

    {
        std::fstream input(argv[1], std::ios::in | std::ios::binary);
        if (!input)
        {
            std::cout << argv[1] << ": File not found. Creating a new file." << std::endl;
        }
        else if (!address_book.ParseFromIstream(&input))
        {
            std::cerr << "Failed to parse address book." << std::endl;
            return -1;
        }
    }

    PromptForAddress(address_book.add_person());

    {
        std::fstream output(argv[1], std::ios::out | std::ios::trunc | std::ios::binary);
        if (!address_book.SerializeToOstream(&output))
        {
            std::cerr << "Failed to write address book." << std::endl;
            return -1;
        }
    }

    google::protobuf::ShutdownProtobufLibrary();

    return 0;
}