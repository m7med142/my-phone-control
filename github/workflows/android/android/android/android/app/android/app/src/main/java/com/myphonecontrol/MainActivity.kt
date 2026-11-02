package com.myphonecontrol

import android.app.Activity
import android.os.Bundle
import android.graphics.Color
import android.view.Gravity
import android.widget.LinearLayout
import android.widget.TextView

class MainActivity : Activity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val layout = LinearLayout(this)
        layout.orientation = LinearLayout.VERTICAL
        layout.gravity = Gravity.CENTER
        layout.setPadding(30, 30, 30, 30)
        layout.setBackgroundColor(Color.WHITE)

        val title = TextView(this)
        title.text = "My Phone Control"
        title.textSize = 28f
        title.setTextColor(Color.BLACK)
        title.gravity = Gravity.CENTER

        val message = TextView(this)
        message.text = "التطبيق يعمل بنجاح\n\nسيتم إضافة نظام الربط والتحكم بموافقة صاحب الهاتف."
        message.textSize = 18f
        message.setTextColor(Color.DKGRAY)
        message.gravity = Gravity.CENTER
        message.setPadding(0, 30, 0, 0)

        layout.addView(title)
        layout.addView(message)

        setContentView(layout)
    }
}
