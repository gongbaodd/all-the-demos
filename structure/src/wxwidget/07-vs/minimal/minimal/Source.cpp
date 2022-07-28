#include <wx/wx.h>

/**
class Button : public wxFrame {
public:
	Button(const wxString &title);
};

Button::Button(const wxString &title)
	: wxFrame(NULL, wxID_ANY, title, wxDefaultPosition, wxSize(300, 200)) 
{
	Center();
}
**/

class MyApp : public wxApp {
public:
	virtual bool OnInit();
};

IMPLEMENT_APP(MyApp)

bool MyApp::OnInit() {
	/*
	Button* win = new Button(wxT('Window'));
	win->Show(true);
	*/
	return true;
}



