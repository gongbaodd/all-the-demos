#ifndef __TOOLBAR_H__
#define __TOOLBAR_H__

#include <wx/wx.h>

class Toolbar : public wxFrame
{
public:
    Toolbar(const wxString &title);
    void OnQuit(wxCommandEvent &event);
};

#endif