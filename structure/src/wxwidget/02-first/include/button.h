#ifndef __BUTTON_H__
#define __BUTTON_H__

#include <wx/wx.h>

class Button : public wxFrame
{
public:
    Button(const wxString &title);
    void OnQuit(wxCommandEvent &event);
};

#endif