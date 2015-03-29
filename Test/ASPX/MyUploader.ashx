<%@ WebHandler Language="VB" Class="MyUploader" %>

Imports System
Imports System.Web
Imports System.IO
Imports System.Threading

Public Class MyUploader : Implements IHttpHandler
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Dim files As HttpFileCollection = HttpContext.Current.Request.Files
        Dim name As String = String.Empty
        Dim ext As String = String.Empty
        Dim mPath As Page = New Page()
        
        Try
            For i = 0 To files.Count - 1
                name = files.Item(i).FileName
            
                'For internet explorer            
                name = name.Split("\").Last.ToString()
            
                ext = Path.GetExtension(name)
                If ValidaExtension(ext) Then
                    files.Item(i).SaveAs("/images2/" & name)
                End If

            Next
            context.Response.ContentType = "text/plain"
            context.Response.Write("Ok!")
        Catch ex As Exception
            Throw New Exception(ex.Message)
        End Try
        
    End Sub
 
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property
    
    Public Function ValidaExtension(ByVal sExtension As String) As Boolean
        Select Case sExtension
            Case ".jpg", ".jpeg", ".png", ".gif", ".bmp"
                Return True
            Case Else
                Return False
        End Select
    End Function

End Class