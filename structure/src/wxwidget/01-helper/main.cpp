#include <wx/string.h>
#include <wx/utils.h>
#include <wx/datetime.h>
#include <wx/file.h>
#include <wx/textfile.h>
#include <wx/dir.h>
#include <wx/filefn.h>

int main()
{
    // Format
    int flowers = 21;

    wxString str;
    str.Printf(wxT("There are %d red roses."), flowers);

    wxPuts(str);

    // Contain
    str = wxT("The history of my life");

    if (str.Contains(wxT("history")))
        wxPuts(wxT("The string contains the word history"));

    if (!str.Contains(wxT("plain")))
        wxPuts(wxT("The string does not contains the word plain"));

    // length
    wxPrintf(wxT("The string has %d characters\n"), str.Length());

    // cases
    wxPuts(str.MakeLower());
    wxPuts(str.MakeUpper());

    // shell
    wxShell(wxT("ls -l"));

    // system
    wxPuts(wxGetHomeDir());
    wxPuts(wxGetOsDescription());
    wxPuts(wxGetUserName());
    wxPuts(wxGetFullHostName());

    long mem = wxGetFreeMemory().ToLong();
    wxPrintf(wxT("Free memory: %ld\n"), mem);

    // datetime
    wxDateTime now = wxDateTime::Now();

    wxString date1 = now.Format();
    wxString date2 = now.Format(wxT("%X"));
    wxString date3 = now.Format(wxT("%x"));

    wxPuts(date1);
    wxPuts(date2);
    wxPuts(date3);

    wxPrintf(wxT(" Tokyo: %s\n"), now.Format(wxT("%a %T"), wxDateTime::GMT9).c_str());
    wxPrintf(wxT(" Moscow: %s\n"), now.Format(wxT("%a %T"), wxDateTime::MSD).c_str());
    wxPrintf(wxT(" Budapest: %s\n"), now.Format(wxT("%a %T"), wxDateTime::CEST).c_str());
    wxPrintf(wxT(" London: %s\n"), now.Format(wxT("%a %T"), wxDateTime::WEST).c_str());
    wxPrintf(wxT(" New York: %s\n"), now.Format(wxT("%a %T"), wxDateTime::EDT).c_str());

    // datespan
    date1 = now.Format(wxT("%B %d %Y"));
    wxPuts(date1);

    wxDateSpan span(0, 1);
    wxDateTime then = now.Add(span);

    date2 = then.Format(wxT("%B %d %Y"));
    wxPuts(date2);

    // createFile
    str = wxT("You make me want to be a better man.\n");

    wxFile file;
    file.Create(wxT("quote"), true);

    if (file.IsOpened())
        wxPuts(wxT("The file is opened"));

    file.Write(str);
    file.Close();

    if (!file.IsOpened())
        wxPuts(wxT("The file is closed"));

    wxShell(wxT("cat quote"));

    // readFile
    wxTextFile textfile(wxT("test.c"));
    textfile.Open();

    wxPrintf(wxT("Number of lines: %d\n"), textfile.GetLineCount());
    wxPrintf(wxT("First line: %s\n"), textfile.GetFirstLine().c_str());
    wxPrintf(wxT("Last line: %s\n"), textfile.GetLastLine().c_str());

    wxPuts(wxT("-----------------------------"));

    wxString s;

    for (s = textfile.GetFirstLine(); !textfile.Eof(); s = textfile.GetNextLine())
    {
        wxPuts(s);
    }

    textfile.Close();

    // dir
    wxDir dir(wxGetCwd());

    wxString filename;

    bool cont = dir.GetFirst(&filename, wxEmptyString, wxDIR_FILES | wxDIR_DIRS);

    while (cont)
    {
        wxPuts(filename);
        cont = dir.GetNext(&filename);
    }
}